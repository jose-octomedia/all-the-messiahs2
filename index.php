<?php $version = 93939239191; ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>All The Messiahs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="generator" content="Webflow">
    <link rel="stylesheet" type="text/css" href="css/base.css">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <script type="text/javascript" src="js/modernizr-2.7.1.js"></script>
    <script type="text/javascript" src="js/modernizr-custom.js"></script>
</head>

<body>
    <div class="book-container">
        <div class="slider w-slider" data-animation="cross" data-duration="500" data-infinite="0" data-hide-arrows="1">
            <div class="slider-mask w-slider-mask">
                <?php if(isset($_GET['mobile'])) {
                    $limit = 76;
                    $mobile = true;
                    $images_path = 'images/book_mobile/';
                }else{
                    $limit = 38;
                    $mobile = false;
                    $images_path = 'images/book/allthemessiahs_';
                } ?>
                
                <?php for($i = 1; $i<= $limit; $i++): //38 - 76 ?>
                    <div class="slide w-slide slide-desktop">
                        <img class="slide-image hidden slide-img-desktop" data-image-src="<?=$images_path?><?=$i?>.jpg">
                    </div>
                <?php endfor; ?>
            </div>
            
            <div class="left-arrow w-slider-arrow-left">
                <img src="images/left-arrow.png">
            </div>
            <div class="right-arrow w-slider-arrow-right">
                <img src="images/right-arrow.png">
            </div>
            <div class="w-round w-slider-nav" style="display:none;"></div>
        </div>
    </div>
    
    <div class="zoom-wrap hidden">
        <div class="zoom-book">
            <section id="focal">
                <div class="parent">
                    <div class="panzoom">
                        <img src="" class="zoom-img" />
                    </div>
                </div>
                
                <div class="zoom-controls">
                    <div class="jump-page-control">
                        Page &nbsp;
                        <select>
                            <?php if(!$mobile):?>
                                <?php $page = 0; ?>
                                <?php for($i = 1; $i<= $limit; $i++): //38 - 76 ?>
                                    <?php $right = ($page + 1) * 2 ?>
                                    <?php $left = $right - 1 ?>
                                    <option value="<?=$page?>"><?=$left?>-<?=$right?></option>
                                    <?php $page++; ?>
                                <?php endfor;?>
                            <?php endif;?>
                            
                            <?php if($mobile):?>
                                <?php $page = 0; ?>
                                <?php for($i = 1; $i<= $limit; $i++): //38 - 76 ?>
                                    <option value="<?=$page?>"><?=$i?></option>
                                    <?php $page++; ?>
                                <?php endfor;?>
                            <?php endif;?>
                        </select>
                    </div>
                    <div class="left-control">
                        <a href="#">
                            <img src="images/left-icon.png" title="Previous Page">
                        </a>
                    </div>
                    <div class="right-control">
                        <a href="#">
                            <img src="images/right-icon.png"  title="Next Page">
                        </a>
                    </div>
                    <div class="zoom-in-control">
                        <a href="#">
                            <img src="images/zoom-in-icon.png" title="Zoom In">
                        </a>
                    </div>
                    <div class="zoom-out-control">
                        <a href="#">
                            <img src="images/zoom-out-icon.png" title="Zoom Out">
                        </a>
                    </div>
                    <div class="zoom-reset-control">
                        <a href="#">
                            <img src="images/reset-icon.png" title="Reset">
                        </a>
                    </div>
                    <div class="zoom-close">
                        <a href="#">
                            <img src="images/red-close-icon.png" title="Close">
                        </a>
                    </div>
                </div>
                
            </section>
        </div>
        
    </div>
    
    <div class="zoom-disclaimer hidden" style="text-align: center;">
        Use the magnifying glass below to zoom in or Out. Or click on the image. <a href="#">Close</a>
    </div>

    <div class="full-page-disclaimer hidden" style="text-align: center;">
        <b>If you want to see the full page version, try a device with a <span style="color:red">Higher Resolution</span>.</b> <a href="#">Close</a>
    </div>

    <div class="footer">
        <div class="footer-container w-container">
            <div class="w-row pages">
                <div class="separator first"></div>
                <?php if($mobile):?>
                    <!--<div class="w-col w-col-tiny-12" style="text-align: center;">
                        <div class="page-number-mobile" style="display:inline-block;">Page <span class="page-number">1</span></div>
                    </div>-->
                <?php endif; ?>
                
                <?php if(!$mobile): ?>
                    <div class="col-left w-col w-col-2 w-col-small-5 w-col-tiny-5">
                        <div>Page <span class="page-left">1</span></div>
                    </div>
                <?php endif; ?>
                <div class="<?=!$mobile ? 'col-left w-col w-col-8 w-col-small-2 w-col-tiny-2' : 'w-col w-col-tiny-12 controls-mobile'?> zoom-col">
                    
                    <div class="jump-trigger jump-page-control">
                        Page &nbsp;
                        <select>
                            <?php if(!$mobile):?>
                                <?php $page = 0; ?>
                                <?php for($i = 1; $i<= $limit; $i++): //38 - 76 ?>
                                    <?php $right = ($page + 1) * 2 ?>
                                    <?php $left = $right - 1 ?>
                                    <option value="<?=$page?>"><?=$left?>-<?=$right?></option>
                                    <?php $page++; ?>
                                <?php endfor;?>
                            <?php endif;?>
                            
                            <?php if($mobile):?>
                                <?php $page = 0; ?>
                                <?php for($i = 1; $i<= $limit; $i++): //38 - 76 ?>
                                    <option value="<?=$page?>"><?=$i?></option>
                                    <?php $page++; ?>
                                <?php endfor;?>
                            <?php endif;?>
                        </select>
                    </div>
                    <div class="left-trigger left-control">
                        <a href="#">
                            <img src="images/left-icon.png" title="Previous Page">
                        </a>
                    </div>
                    <div class="right-trigger right-control">
                        <a href="#">
                            <img src="images/right-icon.png"  title="Next Page">
                        </a>
                    </div>
                    <div class="zoom-in-trigger hidden">
                        <a href="#">
                            <img src="images/zoom-in-icon.png">
                        </a>
                    </div>
                    
                    <div class="details-trigger" style="background: yellow;" data-current-position="down">
                        <a href="#">
                            <img src="images/icon-darrow-up.png" style="padding:4px;">
                        </a>
                    </div>

                    <?php if(!$mobile){?>
                        <div class="fullscreen-trigger" style="background: #ff9500;" data-current-position="down">
                            <a href="#">
                                <img src="images/icon-fullscreen.png" style="padding:0px;">
                            </a>
                        </div>
                    <?php } ?>
                </div>
                <?php if(!$mobile): ?>
                    <div class="col-right w-col w-col-2 w-col-small-5 w-col-tiny-5">
                        <div>Page <span class="page-right">2</span></div>
                    </div>
                <?php endif; ?>
            </div>
             
            <div class="separator full arrow-up-block second-separator"></div>
            
            <div class="disclaimer arrow-up-block">
                <p>This was sent to us anonymously</p>
                <a class="more-info w-button arrow-up-block" href="#">More Info</a>
            </div>
            
            <div class="separator arrow-up-block">|</div>
            
            <a class="w-inline-block arrow-up-block" href="https://schismmsihcs.wordpress.com/" target="_blank">
                <img class="publisher-img" src="/images/schim-logo.png" width="110">
            </a>
        </div>
    </div>
    
    <div class="book-version" data-book-version="<?=isset($_GET['mobile']) ? 'mobile' : 'desktop';?>"></div>
    
    
    <div class="info-container">
        <div class="info-container-inner">
            <a class="close-info w-inline-block" href="#"><img src="/images/red-close-icon.png"></a>

            <div class="info-block">
                <h3 class="h3">This was sent to us anonymously, with a note that read:</h3>
                <p class="quote">"Found among the possessions of someone no longer with us."</p>
                <a class="logo-link w-inline-block" target="_blank" href="https://schismmsihcs.wordpress.com/">
                    <img src="/images/schim-logo.png" class="logo-popup">
                </a>
                <h3 class="h3 schism-quote">Schism Press apologizes for any liberties taken in its presentation</h3>
            </div>
            <div class="info-block">
                <div class="w-embed w-video youtube" style="padding-top: 56.17021276595745%;">
                    <iframe class="embedly-embed" src="https://www.youtube.com/embed/Bj2hEYtwHa4" scrolling="no" frameborder="0" allowfullscreen=""></iframe>
                </div>
            </div>
            <div class="info-block last">
                <ul class="list">
                    <li class="list-item">
                        <p>Ghosts stuttering from an abyss reconstructed with profane and profound tenderness. Their husks have fallen out, their decayed flesh hangs on, all stealth and searing pain. Here, faces of gods shine or are they scrawled with the trash of EuroAmerican civilization.</p>
                        <div class="author">- Monica Mody, Author of <span style="font-style:italic">Kala Pani</span> (1913 Press)</div>
                    </li>
                    <li class="list-item">
                        <p>A book like if a Mexican death tabloid snatched you by the shorts and intoned the names of your ancestors in alphabetical order. This has gone beyond surgery with your so-called ability to parse a text. The words parse you.  A baby shut between the covers and stomped with such a precise culmination of weight that it is the only thing I will pay to own.</p>
                        <div class="author">- Sean Kilpatrick</div>
                    </li>
                    <li class="list-item">
                        <p>A claustro centrifuge cake collaged cunningly collated to capacity caged on the page.</p>
                        <div class="author">- Penny Goring</div>
                    </li>
                    <li class="list-item">
                        <p>Obscure and visceral conflicts among the Modiglianoids. A meta-palimpsest wrought from DIY paste-up aesthetic, in which the resulting textures are as instrumental as the text in rendering partial excavations of a lost narrative.</p>
                        <div class="author">- Colin Raff</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
    
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/base.js"></script>
    <!--[if lte IE 9]><script src="//cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif]-->
    <script type="text/javascript" src="vendor/panzoom/jquery.panzoom.min.js"></script>
    <script type="text/javascript" src="js/screenfull.min.js"></script>
    <script type="text/javascript" src="js/scripts.js"></script>
</body>

</html>