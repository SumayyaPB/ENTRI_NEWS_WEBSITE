import Employee from "../Model/empolyeeModel.js";

const addEmployees = async(req,res)=>{
   try {
    await Employee.create([
        {name:'Jean-Luc Picard',age:59,rank:'Captain'},
        {name:'William Riker',age:29,rank:'Commander'},
        {name:'Deannna Troi',age:28,rank:'Lieutenant Commander'},
        {name:'Geordi La Forge',age:29,rank:'Lieutenant'},
        {name:'Worf',age:54,rank:'Lieutenant'}
    ])
    res.status(201).send("Employees added");
    
   } catch (error) {
     console.log(error);
     res.status(500).json({error:"internal server error"})
   }
}

const countByAge = async(req,res)=>{
   try {
     const records = await Employee.aggregate([
        {
          $group:
          {
            _id : "$age",
            count : {$sum:1}
          }
        }
     ])
     res.status(200).json(records)
    
   } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
   }
}

const countByAgeGreaterThan = async (req,res)=>{
   try {
     const age = Number(req.params.age);
     const records = await Employee.aggregate([
      {
        $match:
            {
              age:{$gte:age}
            }
      },
      {
        $group:
              {
                _id:"$age",
                count:{$sum:1}
              }
              
      }
      
     ]) 
     res.status(200).json(records)

   } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
   }
}
const getEmployeeSortByName = async (req,res)=>{
  try {
    const records = await Employee.aggregate([
      {$sort:{name:-1}},
      {$limit:4},
      {$project:
        {_id:0, EmployeeName:"$name", rank:1}
      }

    ])
    res.status(200).json(records)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
  }
    
}
export {addEmployees,countByAge,countByAgeGreaterThan,getEmployeeSortByName}
