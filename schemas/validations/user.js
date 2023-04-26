const schemaCreateUser = {
  type: 'object',
  properties: {
    id_user: { type: 'string' },
    name: { type: 'string' },
    surname: { type: 'string' },
    email: { type: 'string' },
    photo: { type: 'string' },
    id_role: { type: 'integer' },
  },
  additionalProperties: false,
  required: ['id_user', 'name', 'surname', 'email', 'photo', 'id_role'],
};

exports.schemaCreateUser = schemaCreateUser;
