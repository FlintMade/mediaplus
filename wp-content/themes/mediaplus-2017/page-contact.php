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
<div class="contain">
  <section class="page-section--feature row row--third-two-thirds buoyant-parent">
    <h1 class="h2 grid-col"><?php the_title(); ?></h1>
    <div class="feature-address grid-col">
      <p>
        <?php echo $street_address; ?><br />
        <?php echo $city_state_zip_code; ?><br />
        USA<br />
      </p>
      <p>
        <?php echo $phone_number; ?><br />
        <a href="mailto:<?php echo $email_address; ?>"><?php echo $email_address; ?></a>
      </p>
    </div>
  </section>
  <div class="page-section row-items contact-rows buoyant-parent">
    <section class="row row--third-two-thirds row-item contact-row">
      <h2 class="grid-col"><?php echo $inquiries_section_title; ?></h2>
      <ul class="grid-col row row--flush row--thirds inquiry-types">
        <?php
          foreach($inquiry_types as $item):
          $item_title = $item['inquiry_type_title'];
          $item_contact_name = $item['contact_name'];
          $item_contact_email = $item['contact_email_address'];
        ?>
          <li class="grid-col inquiry-type">
            <h3><?php echo $item_title; ?></h3>
            <p class="inquiry__name">
              <?php echo $item_contact_name; ?>
            </p>
            <p class="inquiry__email">
              <a href="mailto:<?php echo $item_contact_email; ?>">
                <?php echo $item_contact_email; ?>
              </a>
            </p>
          </li>
        <?php endforeach; ?>
      </ul>
    </section>
    <section class="row row--third-two-thirds row-item contact-row">
      <h2 class="grid-col"><?php echo $additional_section_title; ?></h2>
      <div class="grid-col row row--flush row--thirds">
        <div class="grid-col">
          <h3><?php echo $pdfs_title; ?></h3>
          <?php echo $pdfs_text; ?>
        </div>
        <div class="grid-col">
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
        </div>
        <div class="grid-col">
          <?php include('includes/mc-form.php'); ?>
        </div>
      </div>
    </section>
  </div>
</div>
<?php endwhile;?>
<?php get_footer(); ?>