handleAccess('public')
function insertHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('#header').insertAdjacentHTML('beforeend', `
    <div class="brand">
            <a href="./index.html" class="logo">Jangware</a>
            <div class="sidebar-toggle-box">
                <div class="fa fa-bars"></div>
            </div>
        </div>
        <div class="nav notify-row" id="top_menu">
            <ul class="nav top-menu">
                <li id="header_inbox_bar" class="dropdown">
                    <a href="https://vps91518.serveur-vps.net/webmail/" target="_blank" title="Messagerie">
                        <i class="fa fa-envelope-o"></i>
                    </a>
                </li>
                <li id="header_notification_bar" class="dropdown">
                    <a href="http://jangware.com/forum/public/" target="_blank" title="Forum">
                        <i class="fa fa-bell-o"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="top-nav clearfix">
            <ul class="nav pull-right top-menu">
            <!--<li><input type="text" class="form-control search" placeholder=" Search"></li>-->
                <li class="dropdown">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <img alt="" src="images/avatar.webp">
                        <span class="username">${user.firstName}</span>
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu extended logout">
                        <li>
                            <a href="#" onclick="logout()"><i class="fa fa-key"></i>Se déconnecter</a>
                        </li>
                    </ul>
                </li>
                <!-- user login dropdown end -->
            </ul>
    </div>
    `)
}

insertHeader()