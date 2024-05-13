import mongoose from 'mongoose'
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb+srv://sumayyapb38:kpu%40vF.NZeNbx6h@cluster0.nw3sbgh.mongodb.net/FSDCrashCourse?retryWrites=true&w=majority');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
// main().then(
//     console.log('connected to DB')
// ).catch(err=>{
//    console.log(err);
// })
const employeeSchema = new mongoose.Schema({
    name: String,
    age:Number,
    rank:String,
    
});

const  Employee= mongoose.model('employees', employeeSchema );
// Employee.collection.createIndex({name:1},{unique:true})

export default Employee;