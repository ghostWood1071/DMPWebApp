var id = localStorage.getItem("userID");
$.get(`https://api.duocmyphamhaiduong.com/ReportMemberQuantityByLevel?id=${id}`).done(
    function (res) {
        var level = res[0]
        var data = [
            { y: 'TV cấp 1', a: level.Level1 },
            { y: 'TV cấp 2', a: level.Level2 },
            { y: 'TV cấp 3', a: level.Level3 },
            { y: 'TV cấp 4', a: level.Level4 },
            { y: 'TV cấp 5', a: level.Level5 },
            { y: 'TV cấp 6', a: level.Level6 },
            { y: 'TV cấp 7', a: level.Level7 },
            { y: 'TV cấp 8', a: level.Level8 },
            { y: 'TV cấp 9', a: level.Level9 },
            { y: 'TV cấp 10', a: level.Level10 }
        ]
        config = {
            data: data,
            xLabelMargin: 1,
            xkey: 'y',
            ykeys: 'a',
            barSizeRatio: 0.4,
            labels: ['Số lượng', 'Total Outcome'],
            fillOpacity: 0.9,
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors: ['#ffffff'],
            pointStrokeColors: ['black'],
            lineColors: ['gray', 'red'],
            yLabelFormat: function (y) {
                return y = Math.round(y);
            }
        };
        config.element = 'bar-chart';
        Morris.Bar(config);
    })
$.get(`https://api.duocmyphamhaiduong.com/ReportMemberQuantityByPosition?id=${id}`).done(
    function (res) {
        data = res[0];
        $('#pos1')[0].textContent = data.TruongPhong
        $('#pos2')[0].textContent = data.TruongPhongDuBi
        $('#pos3')[0].textContent = data.TruongNhom
        $('#pos4')[0].textContent = data.ThanhVienDC
        $('#pos5')[0].textContent = data.ThanhVienTC
        $('#pos6')[0].textContent = data.ThanhVien300
        $('#pos7')[0].textContent = data.ThanhVien
        console.log(data);
    })