const Knex = require('knex').default

const option = {
    host: '127.0.0.1',
    user: 'root',
    database: 'clase11'
};


const knex = Knex({
    client: 'mysql2',
    connection: option
})

const ejecutar = async () => {
    await knex.schema.dropTableIfExists('alumno2');
    await knex.schema.createTable('alumno2', (table) => {
        table.increments('id');
        table.string('nombre', 30);
        table.integer('edad');
        })
    
    await knex('alumno2').insert({nombre: 'pepito2', edad:'30'})
    await knex.from('alumno2').select('*').then((filas) => console.log(filas));
    await knex.destroy()
}
ejecutar()



