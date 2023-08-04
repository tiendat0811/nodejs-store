let currentPage = 1
// Lấy trang từ URL
const urlParams = new URLSearchParams(window.location.search)
const page = urlParams.get("page")
if (page) {
    currentPage = parseInt(page)
}
getPost(currentPage)
const paginationPostElement = document.querySelector(".post-container .pagination")

function getPost(page) {
    const limit = 5
    const baseUrl = `${window.location.pathname}?page=${page}&limit=${limit}`
    history.pushState({}, "", baseUrl)
    const newUrl = `${window.location.pathname}/index?category=news&page=${page}&limit=5`

    // Gửi yêu cầu AJAX để nhận dữ liệu bài viết mới
    const xhr = new XMLHttpRequest()
    xhr.open("GET", newUrl, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText)
            const postsContainer = document.querySelector(".posts-list")
            // Xóa danh sách bài viết hiện tại
            while (postsContainer.firstChild) {
                postsContainer.firstChild.remove()
            }
            if (responseData.data.data.length === 0) {
                const empty = document.createElement("h1")
                empty.classList.add("empty")
                empty.textContent = "Không có bài viết nào"
                postsContainer.appendChild(empty)
                return
            }

            // Cập nhật tổng số trang
            let totalPages = parseInt(responseData.data.count / limit)
            if (responseData.data.count % limit > 0) {
                totalPages++
            }
            createPagination(paginationPostElement, page, totalPages, getPost)
            // Render lại danh sách bài viết mới
            responseData.data.data.forEach(function (post) {
                const listItem = document.createElement("li")
                let url = post.image ? post.image : '/static/images/news.png'
                listItem.innerHTML = `
                    <a href="/post/${post.slug}">
                        <img src="${url}" alt="${post.title}">
                        <div class="info">
                            <div class="time">${post.createdDate}</div>
                            <div class="title">${post.title}</div>
                            <div class="description">${post.summary}</div>
                        </div>
                        </a>
                        `
                postsContainer.appendChild(listItem)

            })
        }
    }
    xhr.send()
}