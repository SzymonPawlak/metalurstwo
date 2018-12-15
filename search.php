<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="format-detection" content="telephone=no"/>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <title>About</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Links -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/search.css">


    <!--JS-->
    <script src="js/jquery.js"></script>
    <script src="js/jquery-migrate-1.2.1.min.js"></script>


    <!--[if lt IE 9]>
    <div style=' clear: both; text-align:center; position: relative;'>
        <a href="http://windows.microsoft.com/en-US/internet-explorer/..">
            <img src="images/ie8-panel/warning_bar_0000_us.jpg" border="0" height="42" width="820"
                 alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today."/>
        </a>
    </div>
    <script src="js/html5shiv.js"></script>
    <![endif]-->
    <script src='js/device.min.js'></script>
</head>

<body>
<div class="page">
	 <!--========================================================
                                  HEADER
        =========================================================-->
        <header>
            <div id="stuck_container" class="stuck_container">
                <nav class="navbar navbar-static-top ">
                    <div class="container">
                        <div class="navbar-brand p-null">
                            <a href="./">
                                <img src="images/logo.png" alt=""/>

                                <h1>Steel<br>
                                    <small class="small">and Fabrication Industry</small>
                                </h1>
                            </a>
                        </div>
                        <ul class="nav navbar-nav sf-menu" data-type="navbar">
                            <li>
                                <a class="dropdown" href="./">Home</a>
                                <ul>
                                    <li>
                                        <a href="#">Dolor sit amet </a>
                                    </li>
                                    <li>
                                        <a href="#">Adipisicing </a>
                                    </li>
                                    <li>
                                        <a href="#">Elit sed do </a>
                                        <ul>
                                            <li>
                                                <a href="#">Latest</a>
                                            </li>
                                            <li>
                                                <a href="#">Archive</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Eiusmod tempor </a>
                                    </li>
                                    <li>
                                        <a href="#">Incididunt ut labore </a>
                                    </li>
                                    <li>
                                        <a href="#">Et dolore</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="index-1.html"> Company </a>

                            </li>
                            <li>
                                <a href="index-2.html">Products &#38; Services</a>
                            </li>
                            <li>
                                <a href="index-3.html"> Project Gallery</a>
                            </li>

                            <li>
                                <a href="index-4.html">Contacts</a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>

        </header>
	<!--========================================================
                        	CONTENT
	=========================================================-->
 <div class="container">
       <form class="search-form" action="search.php" method="GET" accept-charset="utf-8">
             <label class="search-form_label">
                 <input class="search-form_input" type="text" name="s" autocomplete="off" placeholder=" "/>
                   <span class="search-form_liveout"></span>

             </label>

       </form>
     </div>


    <section id="content" class="content">
        <div class="container blc1">
            <h2>Search Results</h4>
            <div id="search-results"></div>
        </div>
    </section>
	 <!--========================================================
                                FOOTER
      =========================================================-->
        <footer>
            <div class="container">
                <p class="copyright">
                    Steel and Fabrication Industry &#169; <span id="copyright-year"></span>.
                    <a href="index-5.html">Privacy Policy</a>
                </p>
            </div>
        </footer>
	<!--JS-->
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/tm-scripts.js"></script>
</div>
</body>
</html>