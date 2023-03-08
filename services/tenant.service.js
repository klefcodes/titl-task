const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const edit = async (payload, id) => {
  return await prisma.tenant.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...payload,
    },
  });
};

const tenantService = { edit };

module.exports = tenantService;
