const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  findTrips
};


//used for endpoint where it's GET for /api/guides
function find() {
  //should give you every guide
  return db('patrons');
}

function findBy(filter) {
  
  return db('patrons').where(filter);
}

//used for endpoint where it's a POST for /api/guides
async function add(guide) {
  const [id] = await db('patrons').insert(guide);

  return findById(id);
}

//used for endpoint where it's a PUT for /api/guides/:id
async function update(id, changes) {
   await db('patrons').where('id', id).update(changes);
   return findById(id);
}


//used for endpoint where it's /api/guides/:id
function findById(id) {
  return db('patrons')
    .where({id})
    .first();
}

