module.exports = [{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello World'
  }
},
{
  method: 'GET',
  path: '/trips',
  handler: async (request, h) => {
    const data = await request.mongo.db.collection('trips').find().toArray()
    console.log(data)
    return data
  }
}, {
  method: 'GET',
  path: '/trips/{id}',
  handler: async (request, h) => {
    const id = request.params.id
    const ObjectID = request.mongo.ObjectID
    const data = await request.mongo.db.collection('trips').findOne({ _id: new ObjectID(id) })
    console.log(data)
    return data
  }
}, {
  method: 'GET',
  path: '/expenses/{tripId}',
  handler: async (request, h) => {
    const tripId = request.params.tripId
    const data = await request.mongo.db.collection('expenses').find({ trip: tripId }).toArray()
    console.log(data)
    return data
  }
}, {
  method: 'POST',
  path: '/new-trip',
  handler: async (request, h) => {
    const payload = request.payload
    await request.mongo.db.collection('trips').insertOne(payload)
    return { status: 'ok' }
  }
}, {
  method: 'POST',
  path: '/new-expense',
  handler: async (request, h) => {
    const payload = request.payload
    await request.mongo.db.collection('expenses').insertOne(payload)
    return { status: 'ok' }
  }
}, {
  method: 'PUT',
  path: '/expenses/{id}',
  handler: async (request, h) => {
    const id = request.params.id
    const ObjectID = request.mongo.ObjectID
    const payload = request.payload
    await request.mongo.db.collection('expenses').updateOne({ _id: ObjectID(id) }, { $set: payload })
    return { status: 'ok' }
  }
}]
