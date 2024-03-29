import prisma from "../../utils/prisma";

export const FetchProject = async ({
  created_by,
  search,
  limit = 10,
  page = 1,
}: {
  created_by: string;
  search?: string;
  limit?: number;
  page?: number;
}) => {
  return await prisma.tbl_project.findMany({
    where: {
      created_by: created_by,
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    include: {
      technology: {
        select: {
          skill: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take: limit,
    skip: (page - 1) * limit,
  });
};

export const FetchProjectLength = async (created_by: string) => {
  return await prisma.tbl_project.count({
    where: {
      created_by: created_by,
    },
  });
};

export const FetchProjectById = async (id: string) => {
  return await prisma.tbl_project.findUnique({
    where: {
      id: id,
    },
    include: {
      technology: {
        select: {
          skill: true,
        },
      },
    },
  });
};

export const StoreProject = async (data: any) => {
  return await prisma.tbl_project.create({
    data: {
      title: data.title,
      thumbnail: data.thumbnail,
      description: data.description,
      source_code: data.source_code,
      url: data.url,
      created_by: data.created_by,
    },
  });
};

export const StoreProjectTechnology = async (data: any) => {
  return await prisma.tbl_project_technology.create({
    data: {
      project_id: data.project_id,
      skill_id: data.skill_id,
    },
  });
};

export const UpdateProject = async (id: string, data: any) => {
  return await prisma.tbl_project.update({
    where: {
      id: id,
    },
    data: {
      title: data.title,
      thumbnail: data.thumbnail,
      description: data.description,
      source_code: data.source_code,
      url: data.url,
    },
  });
};

export const DestroyProject = async (id: string) => {
  return await prisma.tbl_project.delete({
    where: {
      id: id,
    },
  });
};

export const DestroyAllProjectTechnology = async (project_id: string) => {
  return await prisma.tbl_project_technology.deleteMany({
    where: {
      project_id: project_id,
    },
  });
};
