let currentPage = 1;
let perPage = 15;
let bookproduct = [];  // Khởi tạo mảng bookproduct (có thể là dữ liệu từ localStorage)

// Lấy dữ liệu từ localStorage nếu có
let storedProducts = localStorage.getItem('bookproduct');
if (storedProducts) {
    bookproduct = JSON.parse(storedProducts);  // Parse dữ liệu từ chuỗi JSON thành mảng
}

let pages = Math.ceil(bookproduct.length / perPage); // Tính tổng số trang ban đầu
let pageNumberShow = document.getElementById("pagination_number");
//let pagination_begin = document.getElementById("pagination_begin");
let pagination_prev = document.getElementById("pagination_prev");
let pagination_next = document.getElementById("pagination_next");
//let pagination_end = document.getElementById("pagination_end");

// Hàm hiển thị sản phẩm trên trang
function showPage() {
    let dssp = document.querySelector(".product__box");
    dssp.innerHTML = "";  // Xóa nội dung cũ
    const begin = (currentPage - 1) * perPage;
    const end = begin + perPage;
    const sanpham = bookproduct.slice(begin, end);  // Lấy mảng con từ bookproduct

    sanpham.forEach((bookproduct, index) => {
        const sp = document.createElement("div");
        sp.classList.add("content__box__item");

        sp.innerHTML = `
            <div class="img-product">
                <span class="content__box__item__note__add">
                </span>
                <img src="${bookproduct.image1}" alt="">
            </div>
            <div class="content__box__item__note">
                <span>
                    <h3>ten: ${bookproduct.name}</h3>
                    <h3>gia: ${bookproduct.price}</h3>
                </span>
                <i class="fas fa-heart"></i>
            </div>
        `;
        dssp.appendChild(sp);
    });
    // Phân Trang
    pages = Math.ceil(bookproduct.length / perPage); // Tính lại tổng số trang

    pageNumberShow.innerHTML = '';  // Xóa các nút trang hiện tại

    for (let i = 1; i <= pages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';  // Đánh dấu trang hiện tại

        button.addEventListener('click', () => {
            currentPage = i;
            showPage();  // Hiển thị lại trang sau khi chọn
            // setPageNumber(currentPage);  // Cập nhật lại các nút trang
        });

        pageNumberShow.appendChild(button);
    }
    setProductPreview();
}



// Các sự kiện phân trang
pagination_next.onclick = () => {
    if (currentPage < pages) {
        currentPage++;
        showPage();
    }
};

pagination_prev.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        showPage();
    }
};

// Hiển thị sản phẩm ban đầu
showPage();

// chi tiet san pham:


function setProductPreview() {
    let overlays = document.querySelectorAll(".overlay");
    let products = document.querySelectorAll(".content__box__item");
    products.forEach((product, index) => {
        product.addEventListener("click", () => {
            console.log(currentPage);
            let product_detail_screen = document.getElementById("product__detail");
            let product_id = index + (currentPage-1)*perPage;
            
            product_detail_screen.classList.add("show-flex");

            let product_detail = `
            <div class="product__detail__box">
            <img src="${bookproduct[product_id].image1}" alt="">
            <div class="product__detail__box__text">
            <h1 class="product__detail__box__text_items">${bookproduct[product_id].name}</h1>
            <h3 class="product__detail__box__text_items">Thể loại: ${bookproduct[product_id].theloai}</h3>
            <p class="product__detail__box__text_items">${bookproduct[product_id].description}</p>
            <h2 class="product__detail__box__text_items">${bookproduct[product_id].price}</h2>
            <button id="cart__btn">THÊM VÀO GIỎ</button>
            </div>
            </div>
            `
            product_detail_screen.innerHTML = product_detail;

            let product_detail_box = document.querySelector(".product__detail__box");
            product_detail_box.addEventListener("click", (e) => {
                e.stopPropagation();
            })
            overlays.forEach((overlay) => {
                overlay.addEventListener("click", () => {
                    overlay.classList.remove("show-flex");
                });
            })
        })
    });
}


// chi tiet san pham.
document.addEventListener("keyup", (e) => {
    if (e.keyCode == 27) {
        let overlay = document.querySelectorAll(".overlay");
        overlay.forEach((i) => {
            i.classList.remove("show-flex");
        }) 
    }
})