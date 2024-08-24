import {createClient}from '@supabase/supabase-js'
// Create a supabase client  object to set the Stable API version



export class MovieModel {
  static url = 'https://gwhwzptfplkizqegaljb.supabase.co'
  static password = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aHd6cHRmcGxraXpxZWdhbGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0OTEwOTQsImV4cCI6MjAyNzA2NzA5NH0.bxw-KcIoKKkds4d0guJucWDzpsIztd2FSARwiXy-A1M'

  static async getAll ({ genre }) {

    const supabase = createClient(this.url,this.password)

    if(genre){
      let { data: movie, error } = await supabase
      .from('movie')
      .select('*')
      .eq('genre', genre.toUpperCase())

      return movie

    }

    let { data: movie, error } = await supabase
    .from('movie')
    .select('*')
    console.log(error);
    return movie
        
  }

  static async getById ({ id }) {

    const supabase = createClient(this.url,this.password)

    const {data, erro } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id.toString() )
   if(!data) return {message: 'not found'}

   return data
  }

  static async create ({ input }) {
    const supabase = createClient(this.url,this.password)
    const {data, error } = await supabase
      .from('movies')
      .insert([
       {input}
      ])
      .select()

      return error,data 

  

  if (error) return { message: 'not found'}

  



  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}