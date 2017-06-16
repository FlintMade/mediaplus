  </main>
  <footer role="contentinfo" class="site-footer">
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
    <h2><?php echo $footer_address_title; ?></h2>
    <p>
      <?php echo $street_address; ?><br />
      <?php echo $city_state_zip_code; ?>
    </p>
    <h2><?php echo $footer_phone_email_title; ?></h2>
    <p>
      <?php echo $phone_number; ?><br />
      <a href="mailto:<?php echo $email_address; ?>"><?php echo $email_address; ?></a>
    </p>
    <h2><?php echo $social_media_title; ?></h2>
    <ul>
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
    <small>Copyright &copy; <?php echo date("Y"); ?> <?php echo get_bloginfo('name'); ?> All rights reserved.</small>
  </footer>

<?php wp_footer(); ?>

</body>
</html>