<?php

// session_start();
require('phpmailer/class.phpmailer.php');


$success = false;

function old($field)
{
    global $success;
    if (!$success && isset($_POST[$field])) {
        return $_POST[$field];
    } else {
        return '';
    }
}

// see if form is submitted or not.
// $total = $_SESSION["total"];
if (isset($_POST['submit_p'])) {

    $errors = [];

    $subject = '';
    // $full_name = '';
    $entity_name = '';
    $mobile_email = '';
    // $captcha = false;
    // $total = $_SESSION["total"];

    // function to test namelike fields
    function nameLike($field, $min, $max, $required_error, $min_error, $max_error, $wrong_input)
    {
        global $errors;
        if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
            $errors[$field] = $required_error;
            return false;
        } else {
            if (strlen($_POST[$field]) < $min) {
                $errors[$field] = $min_error;
                return false;
            } else if (strlen($_POST[$field]) > $max) {
                $errors[$field] = $max_error;
                return false;
            } else if (!preg_match('/[0-9A-Za-z \s\-\+\?\,\.\!\;\_\(\)\%]+$/i', $_POST[$field])) {
                $errors[$field] = $wrong_input;
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    if (nameLike('subject_p', 4, 30, 'Please select Subject', 'Minimum 4 characters', 'Maximum 128 characters', 'Please select a valid subject')) {
        $subject = filter_var($_POST['subject_p'], FILTER_SANITIZE_ADD_SLASHES);
    }

    // if (nameLike('full_name', 4, 64, 'Please provide Your full name', 'Minimum 4 characters', 'Maximum 30 characters', 'Please enter valid name')) {
    //     $full_name = filter_var($_POST['full_name'], FILTER_SANITIZE_ADD_SLASHES);
    // }

    if (nameLike('entity_name_p', 4, 64, 'Please provide Your entity name', 'Minimum 4 characters', 'Maximum 30 characters', 'Please enter valid entity name')) {
        $entity_name = filter_var($_POST['entity_name_p'], FILTER_SANITIZE_ADD_SLASHES);
    }

    if (!isset($_POST['mobile_email_p']) || empty(trim($_POST['mobile_email_p'])) || strlen($_POST['mobile_email_p']) < 8 || strlen($_POST['mobile_email_p']) > 20) {
        $errors['mobile_email_p'] = 'Please enter a valid contact number or E-mail ID';
    } else {
        $mobile_email = filter_var($_POST['mobile_email_p'], FILTER_SANITIZE_ADD_SLASHES);
    }

    // if (!isset($_POST['captcha']) || empty($_POST['captcha'])) {
    //     $errors['captcha'] = 'Please enter valid answer';
    // } else if ($_POST['captcha'] != $total) {
    //     $errors['captcha'] = 'Please enter valid answer';
    // } else {
    //     $captcha = true;
    // }

    // send email or set email related errors here
    if (count($errors) == 0) {
        global $success;

        // $subject = '';
        // $full_name = '';
        // $entity_name = '';
        // $mobile_email = '';

        $body = '<table border="1" cellpadding="10" cellspacing="0" style="border: 1px solid #eee;">
						<tr><th bgcolor="#ECE5D8" colspan="2"><h4>Connect for Presentation</h4></th></tr>
						<tr><td>Subject</td><td>' . $subject . '</td></tr>
						<tr><td>Entity name</td><td>' . $entity_name . '</td></tr>
						<tr><td>Mobile/E-mail</td><td>' . $mobile_email . '</td></tr>
					</table>';


        $mail = new PHPMailer();

        //Server settings
        $mail->SMTPDebug = 1;                               //Enable verbose debug output
        $mail->isSMTP();                                    //Send using SMTP
        $mail->Host       = 'mail.phiglobal.in';           //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                           //Enable SMTP authentication
        $mail->Username   = 'contact@phiglobal.in';    //SMTP username
        $mail->Password   = '0^+t[_kka._#';                 //SMTP password
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    //Enable implicit TLS encryption
        $mail->Port       = 587;

        $mail->SetFrom('contact@phiglobal.in', $full_name);
        // $mail->AddReplyTo($email, $name);
        $mail->addAddress("hrishi@idealoftstudio.com"); //Recipient name is optional
        // $mail->addAddress("sunkahaa@gmail.com"); //Recipient name is optional
        // $mail->addAddress("nishi@idealoftstudio.com"); //Recipient name is optional
        $mail->Subject = 'Connect for Presentation!';
        $mail->MsgHTML($body);
        // if (file_exists($_FILES['contact_file']['tmp_name']) && is_uploaded_file($_FILES['contact_file']['tmp_name'])) {
        // 	$mail->AddAttachment($_FILES['contact_file']['tmp_name'], $_FILES['contact_file']['name']);
        // }
        $mail->IsHTML(true);

        if (!$mail->Send()) {
            $errors['generic'] = 'Unknown error. Please try again.';
            echo json_encode($errors);
        } else {
            $success = true;
            echo json_encode(['success' => 'email sent']);
        }
    } else {
        echo json_encode($errors);
    }
} else {
    echo json_encode(['data' => 'No post data']);
}
