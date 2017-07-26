  </main>
  <?php if (!is_front_page() && !is_post_type_archive('expertise') && !is_singular('expertise') && !is_post_type_archive('offerings') && !is_singular('offerings')): ?>
    <footer role="contentinfo" class="footer">
      <div class="contain">
        <?php
          $footer_address_title = get_field('footer_address_title', 13);
          $street_address = get_field('street_address', 13);
          $city_state_zip_code = get_field('city_state_zip_code', 13);
          $footer_phone_email_title = get_field('footer_phone_email_title', 13);
          $phone_number = get_field('phone_number', 13);
          $email_address = get_field('email_address', 13);
          $social_media_title = get_field('social_media_title', 13);
          $social_media_accounts = get_field('social_media_accounts', 13);
        ?>
        <div class="row row--halves">
          <div class="grid-col row row--flush row--thirds footer__contact">
            <div class="grid-col">
              <h2><?php echo $footer_address_title; ?></h2>
              <p>
                <?php echo $street_address; ?><br />
                <?php echo $city_state_zip_code; ?>
              </p>
            </div>
            <div class="grid-col">
              <h2><?php echo $footer_phone_email_title; ?></h2>
              <p>
                <?php echo $phone_number; ?><br />
                <a href="mailto:<?php echo $email_address; ?>"><?php echo $email_address; ?></a>
              </p>
            </div>
            <div class="grid-col">
              <h2><?php echo $social_media_title; ?></h2>
              <ul class="footer__social">
                <?php
                  foreach($social_media_accounts as $item):
                  $item_title = $item['social_media_site'];
                  $item_url = $item['social_media_url'];
                ?>
                  <li>
                    <a href="<?php echo $item_url; ?>"><?php echo $item_title; ?></a>
                  </li>
                <?php endforeach; ?>
              </ul>
            </div>
          </div>
          <div class="grid-col">
            <?php /* Non-interactable on Contact page */ if (is_page('13')): ?>
              <?php include('includes/mc-non-form.php'); ?>
            <?php else: ?>
              <?php include('includes/mc-form.php'); ?>
            <?php endif; ?>
            <small class="footer__copyright">Copyright &copy; <?php echo date("Y"); ?> <?php echo get_bloginfo('name'); ?> All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  <?php endif; ?>

<?php wp_footer(); ?>

<script src="https://use.typekit.net/iuq2xoe.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>

<!-- MAILCHIMP SCRIPT -->
<?php if (!is_front_page() && !is_post_type_archive('expertise') && !is_singular('expertise') && !is_post_type_archive('offerings') && !is_singular('offerings')): ?>
  <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='BIRTHDAY';ftypes[3]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<?php endif ;?>

<?php if (is_singular('post')): ?>
  <script>
    fluidvids.init({
      selector: ['iframe', 'object'],
      players: ['www.youtube.com', 'player.vimeo.com']
    });
  </script>
<?php endif; ?>

<?php include('includes/ga.php'); ?>

</body>
</html>