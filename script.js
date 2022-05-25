
 let listBook= document.getElementById("book-list");
 let addForm =document.getElementById("add-form");
 
 class Book{
    constructor(title,author){
       this.title=title;
       this.author=author
    }
}

class UI{
  static getBook(){
    let books;
    (localStorage.getItem("books")===null)? books=[] : books=JSON.parse(localStorage.getItem("books"));
    return books;
  }
  static storeBook(book){
    let books = this.getBook();
      books.push(book);
      localStorage.setItem("books",JSON.stringify(books));
  }
  static displayBooks(){

  }
  static saveBook(title,author){
    if(title && author){
      let book = new Book(title,author);
      this.storeBook(book);
    }
  }
  static  deleteBook(){
    let books = this.getBook();
    const filteredBook = books.filter((book, i) => index !== i);
    localStorage.setItem('books', JSON.stringify(filteredBook));

    // display book
  }
}
addForm.addEventListener("submit",e=>{
    e.preventDefault();
    let title =document.getElementById("title").value;
    let author =document.getElementById("author").value;
    if(title !== "" && author !==""){
        UI.saveBook(title,author);
    }
})


let screen = new UI();
screen.getBook();







