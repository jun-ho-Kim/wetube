import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

// const delComment = (id, event) => {
//   console.log("target:", target);
//   console.log("id:", id);
//   const span = event.parentElement;
//   commentList.removeChild(span);

// }

// const handleDelete = async event => {
//   const target = event.target;
//   const commentId = target.id;
//   // const videoId = window.location.href.split("/videos/")[1];
//   const response = await axios(`/api/${commentId}/comment/delete`,{
//     method: "POST",
//     data: {
//       commentId
//     }
//   });
//   if(response.status===200) {
//     delComment(commentId, event);
//   }
// }

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  // console.log("comment.creator:", commentId);
  // console.log("commentId.id:", commentId.id);
  // console.log("commentId._id:", commentId._id);
  delBtn.id = String(comment.id);
  delBtn.innerText = "❌";
  console.log("deleteBtn.id:", delBtn.id);
  span.innerHTML = comment;
  // deleteBtn.classList.add(btn);
  li.appendChild(span);
  li.appendChild(delBtn);
  // delBtn.addEventListener("click", handleDelete);
  // li.appendChild(deleteBtn);
  commentList.prepend(li);
  // commentList.appendChild(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios(`/api/${videoId}/comment`,{
    method: "POST",
    data: {
      comment
    }
  });

  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};
function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}
if (addCommentForm) {
  init();
}



// import axios from "axios";

// const addCommentForm = document.getElementById("jsAddComment");
// const commentList = document.getElementById("jsCommentList");
// const commentNumber = document.getElementById("jsCommentNumber");
// const increaseNumber = () => {
//     commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10)+1;
// }

// const addComment = comment => {
//     const li = document.createElement("li");
//     const span = document.createElement("span");
//     span.innerHTML = comment;
//     li.appendChild(span);
//     commentList.prepend(li);
//     increaseNumber();
// };

// const sendComment = async comment => {
//     const videoId = window.location.href.split("/videos/")[1];
//     const response = await axios ({
//         url:`/api/${videoId}/comment`,
//         method: "POST",
//         data : {
//             comment
//         }
//     });
//     consloe.log(response);
//     if(response.status === 200) {
//         addComment(comment);
//     }
// };

// const handleSubmit = (event) => {
//     event.preventDefault();
//     const commentInput = addCommentForm.querySelector("input");
//     const comment = commentInput.value;
//     sendComment(comment);
//     commentInput.value="";
// }

// function init() {
//     addCommentForm.addEventListener("submit", handleSubmit);
// }

// if(addCommentForm) {
//     init();
// }
