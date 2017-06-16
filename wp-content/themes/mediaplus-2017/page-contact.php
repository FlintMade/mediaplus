<?php get_header(); ?>
<?php
  while (have_posts()): the_post(); global $post;
  $street_address = get_field('street_address');
  $city_state_zip_code = get_field('city_state_zip_code');
  $phone_number = get_field('phone_number');
  $email_address = get_field('email_address');
  $inquiries_section_title = get_field('inquiries_section_title');
  $inquiry_types = get_field('inquiry_type');
  $additional_section_title = get_field('additional_section_title');
  $pdfs_title = get_field('pdfs_title');
  $pdfs_text = get_field('pdfs_text');
  $social_media_title = get_field('social_media_title');
  $social_media_accounts = get_field('social_media_accounts');
?>
  <section>
    <h1><?php the_title(); ?></h1>
    <p>
      <?php echo $street_address; ?><br />
      <?php echo $city_state_zip_code; ?><br />
      USA<br />
      <?php echo $phone_number; ?><br />
      <a href="mailto:<?php echo $email_address; ?>"><?php echo $email_address; ?></a>
    </p>
  </section>
  <section>
    <h2><?php echo $inquiries_section_title; ?></h2>
    <ul class="inquiry-types">
      <?php
        foreach($inquiry_types as $item):
        $item_title = $item['inquiry_type_title'];
        $item_contact_name = $item['contact_name'];
        $item_contact_email = $item['contact_email_address'];
      ?>
        <li class="inquiry-type">
          <h3><?php echo $item_title; ?></h3>
          <p>
            <?php echo $item_contact_name; ?><br />
            <?php echo $item_contact_email; ?>
          </p>
        </li>
      <?php endforeach; ?>
    </ul>
  </section>
  <section>
    <h2><?php echo $additional_section_title; ?></h2>
    <h3><?php echo $pdfs_title; ?></h3>
    <?php echo $pdfs_text; ?>
    <h3><?php echo $social_media_title; ?></h3>
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
  </section>
<?php endwhile;?>
<?php get_footer(); ?>