const comment = document.getElementById("jsComment");
const delBtn = document.getElementById("jsCommentDelete");
// const handleDelete = () => {

// }


// function init() {
//     const li = document.createElement(li);
//     const delBtn = document.createElement(span);
//     delBtn.innerText = "❌";
//     console.log(comment);
//     comment.appendChild(delBtn);
//     delBtn.addEventListener("click", handleDelete);
// }

const deleteComment = async event => {
    const target = event.target.parentNode;
    console.log(target);

}

if(delBtn) {
    delBtn.addEventListener("click", deleteComment);
}

