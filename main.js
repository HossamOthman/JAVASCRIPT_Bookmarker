// listen form submit
document.getElementById('form').addEventListener('submit', saveBookmark);






function saveBookmark(e) {
    e.preventDefault();

    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteURL').value;

    var bookmark = {
        id: Date.now(),
        name: siteName,
        url: siteUrl,
    }

    // local storage demo
    // localStorage.setItem('test', 'hello world');
    // localStorage.getItem('test');
    // localStorage.removeItem('test');

    // test if bookmarks is null
    if (localStorage.getItem('bookmarkApp.bookmarks') === null) {
        // Init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem('bookmarkApp.bookmarks', JSON.stringify(bookmarks));
    } else {
        // if there is something else then we fetch it from local storage
        var existBookmarks = JSON.parse(localStorage.getItem('bookmarkApp.bookmarks'));
        // add bookmark to array
        existBookmarks.push(bookmark);
        // re-set it back to local storage... same command above
        localStorage.setItem('bookmarkApp.bookmarks', JSON.stringify(existBookmarks));
    }
    fetchBookmarks();
}

// fetch bookmarks to ui
function fetchBookmarks() {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarkApp.bookmarks'));

    // get output id
    var bookmarkResults = document.getElementById('bookmarksResults');

    // build output
    bookmarkResults.innerHTML = '';
    // looping through to get itterations
    bookmarks.forEach(bookmark => {
        var id = bookmark.id;
        var name = bookmark.name;
        var url = bookmark.url;
        
        var toDate = new Date(id).toISOString().split('T')[0];

        bookmarkResults.innerHTML += `  <div class="resultbkground">
            <h3>${name} <span>added on: ${toDate}</span></h3>
            <div>
                <a class="btn visit" target="_blank" href="${url}">Visit</a>
                <a onclick="deleteBookmark(${id})" class="btn delete" href="#">Delete</a>
            </div>
            </div>`;
    });


}

function deleteBookmark(id) {
   // get bookmarks from local storage
   var existBookmarks = JSON.parse(localStorage.getItem('bookmarkApp.bookmarks'));
   existBookmarks.forEach((bookmark, index) => {
    if (bookmark.id === id) {
        existBookmarks.splice(index, 1)
    }
    // re-set it back to local storage again... after deletion
    localStorage.setItem('bookmarkApp.bookmarks', JSON.stringify(existBookmarks));
    fetchBookmarks();
   })
}