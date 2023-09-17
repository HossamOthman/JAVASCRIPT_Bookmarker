// listen form submit
document.getElementById('form').addEventListener('submit', saveBookmark);






function saveBookmark(e) {
    e.preventDefault();

    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteURL').value;

    var bookmark = {
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

}