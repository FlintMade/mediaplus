  </main>
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
        <div class="grid-col row row--flush row--thirds">
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
          <small class="footer__copyright">Copyright &copy; <?php echo date("Y"); ?> <?php echo get_bloginfo('name'); ?> All rights reserved.</small>
        </div>
      </div>
    </div>
  </footer>

<?php wp_footer(); ?>

</body>
</html>