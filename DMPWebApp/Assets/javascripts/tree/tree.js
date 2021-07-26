class OrgTree{
    initEvent =  function() {
        $('.genealogy-tree ul').hide();
        $('.genealogy-tree>ul').show();
        $('.genealogy-tree ul.active').show();
        $('.genealogy-tree li').on('click', function (e) {
            var children = $(this).find('> ul');
            if (children.is(":visible")) children.hide('fast').removeClass('active');
            else children.show('fast').addClass('active');
            e.stopPropagation();
        });
    }
    
    createNode = function(id, name, img){
        return `
            <li data-id = "${id}">
                <a href="javascript:void(0);">
                    <div class="member-view-box">
                        <div class="member-image">
                            <img src="${img}" alt="Member">
                            <div class="member-details">
                                <h3>${name}</h3>
                            </div>
                        </div>
                    </div>
                </a>
            </li>`
    }
    
    createTree = function(pid){
        return `<ul data-pid = "${pid}">
        
                </ul>`;
    }
    
    init = function(data){
        var tree = $('.genealogy-tree');
        for(var i = 0; i<data.length; i++){
            var node = data[i];
            if(node.pid){
                var parentNode = $(`*[data-id = "${node.pid}"]`);
                if($(`*[data-pid = "${node.pid}"]`).length == 0)
                    parentNode.append(this.createTree(node.pid));
            } else{
                tree.append(this.createTree(node.pid));
            }
            $(`*[data-pid = "${node.pid}"]`).append(this.createNode(node.id, node.name, node.img));
        }
        this.initEvent();
    }
}
