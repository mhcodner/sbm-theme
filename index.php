<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="SBM" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#"
                                      xmlns:fb="https://www.facebook.com/2008/fbml">
<head>
    <base href="/">
    <meta charset="utf-8">
    <title>Solar Bundeena Maianbar</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <?php wp_head(); ?>
</head>
<body ng-cloak>

<header>

    <nav class="green darken-2">
        <div class="nav-wrapper">
            <div class="container">
                <a href="#" data-activates="nav-mobile" class="button-collapse hide-on-large-only"><i class="fa fa-bars"></i></a>
                <a href="/" class="brand-logo">
                    <img src="http://placehold.it/200x64?text=SolarBM" alt="Logo">
                </a>
                
                <div class="top-nav">
                    <ul class="right hide-on-med-and-down" ng-controller="MenuController">
                        <li ng-repeat="item in menuItems" ng-class="{ active:isActive(item.url) }"><a ng-href="{{ item.url }}">{{ item.title }}</a></li>
                    </ul>
                </div>
                <ul id="nav-mobile" class="side-nav" ng-controller="MenuController">
                    <li ng-repeat="item in menuItems"><a class="waves-effect waves-teal" ng-class="{ active:isActive(item.url) }" ng-href="{{ item.url }}">{{ item.title }}</a></li>
                </ul>
                
            </div>
        </div>
    </nav>

</header>

<main>
    <!-- main content here -->
    <div class="view-animate-container">
        <div ng-view class="view-animate page-content"></div>
    </div>
</main>

<footer class="page-footer green darken-2" style="padding-top: 0;">
    <div class="footer-copyright green darken-2">
        <div class="container">
            &copy; <?php echo date("Y"); ?> Solar Bundeena Maianbar
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
