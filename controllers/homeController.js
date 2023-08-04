// Hàm xử lý cho route '/'
exports.index = (req, res) => {
    const title = "CTY CP TBĐ An Phát Sài Gòn - Nhà phân phối độc quyền FSL » An Phát Sài Gòn - NPP Độc Quyền FSL tại Việt Nam";

    // Render view 'index' và truyền các biến dữ liệu
    res.render('home/index', { title: title });
};

exports.about = (req, res) => {
    const title = "Giới thiệu";

    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/about', { title: title });
}

exports.contact = (req, res) => {
    const title = "Liên hệ";

    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/contact', { title: title });
}

exports.flight = (req, res) => {
    const title = "Chuyến bay";

    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/flight', { title: title });
}