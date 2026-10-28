const mongoose =  require("mongoose")


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true, "Technical Question is required"]
    },
    intention:{
        type:String,
        required:[true , "Intention is required "]
    },
    answer:{
        type:String,
        required:[true, "Answer is required"]
    }
},
{
    _id:false
})

const behavirolQuestionSChema = new mongoose.Schema({
     question:{
        type:String,
        required:[true, "Technical Question is required"]
    },
    intention:{
        type:String,
        required:[true , "Intention is required "]
    },
    answer:{
        type:String,
        required:[true, "Answer is required"]
    }
},{
    _id:false
})


const SkillGapSchma = new mongoose.Schema({
        skill:{
            type:String,
            required:[true, "Skill is required"]
        },
        severity:{
            type:String,
            enum:["low","medium","high"],
            required:[true,'severity is required']
        },

},
{
    _id:false   
})

const PreparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true, "Day is required"]  },
    focusArea:{
            type:String,
            required:[true, "Focus area is required"]},
     tasks:{
        type:[String],
        required:[true, "Tasks are required"]
     }       

})

const InterviewReportSchema = new mongoose.Schema({

    jobDescription:{
        type:String,
        required:[true ,"Job description is required"],
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
   matchscore:{
    type:Number,
    min:0,
    max:100,
    required:true
},
    technicalQuestions:[technicalQuestionSchema],

    behavioralQuestions:[behavirolQuestionSChema],

    skillGaps:[SkillGapSchma],


    preparationPlan:[PreparationPlanSchema] 

})

const InterviewReportModel = mongoose.model("interviewReport",InterviewReportSchema)

module.exports = InterviewReportModel   