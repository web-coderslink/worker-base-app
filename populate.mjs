import connectdb from './db/connection.mjs';
import {jobmodel as Job} from './model/jobmodel.mjs';
import { readFile } from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connect } from 'http2';
import { Module } from 'module';


dotenv.config();

const start = async () => {
   try {
       console.log("is it working?????");
      await connectdb(process.env.ATLAS_URI);
      await Job.deleteMany();
      console.log("is it working?????");
      const jsonproducts = JSON.parse(
       await readFile(new URL('./MOCK_DATA.json', import.meta.url))
      );
      console.log("abcdef");
      console.log(jsonproducts);
      await Job.create(jsonproducts)
      console.log("data consted ");
      process.exit(0)
   } catch (error) {
    process.exit(1)
   }
};


start();
