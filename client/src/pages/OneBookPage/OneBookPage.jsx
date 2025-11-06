import "./OneBookPage.css";

export default function OneBookPage({book}) {
    return(
<div> 
<p>{book.name}</p>
<p>{book.autor}</p>
<p>{book.cover}</p>
<p>{book.comment_of_user}</p>
<p>{book.user_id}</p>
</div>
    )
};
