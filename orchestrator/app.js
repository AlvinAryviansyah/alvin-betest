const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

const Redis = require("ioredis");
const redis = new Redis();
const usersUrl = 'http://localhost:4001'

const typeDefs = gql`
  
  type User {
    _id: String
    email: String
    password: String
    username: String
    phoneNumber: Int
    address: String
    role: String
  }

  type Query {
    users: [User]
  }

  type Mutation{
    addUser(email: String, password: String, phoneNumber: Int, address: String, role: String, username: String): User
  }

`;

const resolvers = {
    Query: {
        users(){
            return redis.get('users')
            .then(data => {
              if(data){
                console.log(JSON.parse(data), '<<< ini data')
                return JSON.parse(data)
              }else{
                return axios.get(`${usersUrl}/user`)
                .then(res => {
                    const list = res.data.map(item => {
                      return {
                        _id: item._id,
                        email: item.email,
                        password: item.password,
                        username: item.username,
                        phoneNumber: item.phoneNumber,
                        address: item.address,
                        role: item.role,
                      }
                    })
                    console.log(list, '<<< ini list dari db')
                    redis.set('users', JSON.stringify(list))
                    return list
                })
                .catch(err => {
                    console.log(err)
                    return err
                })
              }              
            })
             
        }
    },
    Mutation: {
        addUser(_, args){
          return axios.post(`${usersUrl}/user`, args)
            .then(res => {
                console.log(res)
                return res.data
            })
            .catch(err => {
                console.log(err)
                return err
            })
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({url}) =>{
    console.log('server running. Url: ', url)
})