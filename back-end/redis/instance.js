import redis from 'redis'

var redisClient = redis.createClient()
export default redisClient
//$env:REDSMIN_KEY="5fa28cc7156d030fb27e95bd"