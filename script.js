const fs = require('fs');
const { Pool } = require('pg');
const Cursor = require('pg-cursor')

const querysCrearTablas = fs.readFileSync('./query.sql').toString();

const args = process.argv.slice(2);
let movimiento = args[0];
let cuenta_1 = args[1];
let cuenta_2 = args[2];
let monto = args[3];

const config = {
  user:'postgres',
  host: 'localhost',
  password: '',
  database: 'banco',
  port: 5432,
};

const pool = new Pool(config);

if ( movimiento == 'transaccion') {
  pool.connect( async (error_conexion, client, release) => {

    if(error_conexion) {
      console.log(error_conexion);
    } else {

      try {
        await client.query('BEGIN');
        const sacar = `UPDATE cuentas SET saldo = saldo - ${monto} WHERE id = ${cuenta_1} RETURNING *;`;
        const descuento = await client.query(sacar);

        const abonar = `UPDATE cuentas SET saldo = saldo + ${monto} WHERE id = ${cuenta_2} RETURNING *;`;
        const acreditacion = await client.query(abonar);

        const date = new Date();
        const ajuste = `INSERT INTO transacciones (descripcion,fecha,monto,cuenta) VALUES ('Transacción','${date.toLocaleDateString()}',${monto},${cuenta_1}) RETURNING *;`;
        const transaccion = await client.query(ajuste);

        console.log("Descuento realizado con éxito: ", descuento.rows[0]);
        console.log("Acreditación realizada con éxito: ", acreditacion.rows[0]);
        console.log("Transacción realizada con éxito: ", transaccion.rows[0]);
        await client.query('COMMIT');

      } catch (e) {
        await client.query('ROLLBACK');
  
        console.log("Error código: " + e.code);
        console.log("Detalle del error: " + e.detail);
        console.log("Tabla originaria del error: " + e.table);
        console.log("Restricción violada en el campo: " + e.constraint);
      }
      release();
      pool.end();
    }
      
  })
}