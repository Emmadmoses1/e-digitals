const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_jbYNpB4LS9DP@ep-patient-base-b5dgierw-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  });
  await client.connect();
  console.log('Connected to database');

  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await client.query(sql);
  console.log('Schema created successfully');

  await client.end();
}

main().catch(console.error);
