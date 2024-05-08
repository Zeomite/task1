const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    postid: {
        type : String,
        required: true
    },
    owner:{
        type : String,
        required: true
    },
    images: {
        type : String,
        validate: {
            validator: function(images) {
                return images.trim()!=="" || this.caption.trim() !== "";
            },
            message: "At least either an image or a caption must be provided."
    }},
    caption: {
        type : String,
        default:""
    },
    comments:{
        type: Array,
        required: true,
        default: [] 
    },
    likes:{
        type: Array,
        default:[],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      }

});

module.exports = mongoose.model("Post", postSchema);