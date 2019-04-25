<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once 'config.php';
$data_array = array();	//Tableau servant a traiter les données
if (isset($_POST["authentication"])) //AUTENTIFICATION UTILISATEUR
{
	if (isset($_POST["username"]) && isset($_POST["password"]))	//Recupération informations utilisateurs
	{
		$sql = "SELECT COUNT(*) as count from user WHERE username = '" . $_POST["username"] . "' AND password = '" . $_POST["password"] . "';";  //Vérification de l'identité
		$exe = $pdo->query($sql);
		if ($exe->fetch(PDO::FETCH_OBJ)->count == '1')
		{echo json_encode(array('auth'=>true));}
		else {echo json_encode(array('auth'=>false));}
	}
}
else if (isset($_POST["register"]))	//AJOUT D'UTILISATEUR
{	
	if (isset($_POST["username"]) && isset($_POST["password"]))	//Recupération informations utilisateurs
	{
		$sql = "SELECT COUNT(*) as count from user WHERE username = '" . $_POST["username"] . "'";	//Ajout de l'utilisateur
		$exe = $pdo->query($sql);
		if (($exe->fetch(PDO::FETCH_OBJ)->count == '0') && ($_POST["username"] != '') && ($_POST["password"] != ''))
		{
			$sql = "INSERT INTO user (username, password) VALUES ('" . $_POST["username"] . "', '" . $_POST["password"] . "')";
			$exe = $pdo->query($sql);
			echo json_encode(array('registered'=>true));
		}
		else
		{
			echo json_encode(array('registered'=>false));
		}
	}
}

else if (isset($_POST["stars"]))	//RECUPERATION DES ETOILES
{
	if (isset($_POST["nb"]))	//Si la requete contient le nombre d'étoiles a renvoyer
	{
		$sql = "SELECT * from stars ORDER by dist LIMIT " . $_POST["nb"];
	}
	else if (isset($_POST["hip"]))	//Si la requête contient une ou plusieurs HIP d'étoile
	{
		$id = explode(",", $_POST["hip"]);
		$sql = "SELECT * from stars where hip = '" . array_shift($id) . "' ";
		foreach ($id as $id_select)
		{
			$sql = $sql . "OR hip = '" . $id_select . "' ";
		}
	}
	else	//Sinon toutes les étoiles
	{
		$sql = "SELECT * FROM stars";
	}
	$exe = $pdo->query($sql);
	while($result = $exe->fetch(PDO::FETCH_OBJ))	//Construction du Json
	{
		array_push($data_array, array(
			"id" => $result->id, 
			"hip" => $result->hip, 
			"hd" => $result->hd, 
			"hr"=> $result->hr,
			"gl"=> $result->gl,
			"bf"=> $result->bf,
			"proper"=> $result->proper,
			"ra"=> $result->ra,
			"idec"=> $result->idec,
			"dist"=> $result->dist,
			"pmra"=> $result->pmra,
			"pmdec"=> $result->pmdec,
			"rv"=> $result->rv,
			"mag"=> $result->mag,
			"absmag"=> $result->absmag,
			"spect"=> $result->spect,
			"ci"=> $result->ci,
			"x"=> $result->x,
			"y"=> $result->y,
			"z"=> $result->z,
			"vx"=> $result->vx,
			"vy"=> $result->vy,
			"vz"=> $result->vz,
			"rarad"=> $result->rarad,
			"decrad"=> $result->decrad,
			"pmrarad"=> $result->pmrarad,
			"pmdecrad"=> $result->pmdecrad,
			"bayer"=> $result->bayer,
			"flam"=> $result->flam,
			"con"=> $result->con,
			"comp"=> $result->comp,
			"comp_primary"=> $result->comp_primary,
			"base"=> $result->base,
			"lum"=> $result->lum,
			"var"=> $result->var,
			"var_min"=> $result->var_min,
			"var_max"=> $result->var_max
		));	
	}
	echo json_encode($data_array);
}
else if (isset($_POST["constellations"])) //RECUPERATION DES CONSTELLATIONS
{
	if (isset($_POST["id"]))	//Verification présence de l'id dans la requête
	{
		$sql = "SELECT constellation.*, constellation_name.name FROM constellation, constellation_name where constellation.identifiant = constellation_name.identifiant AND constellation.id = '" . $_POST["id"] . "'";
	}
	else	//Renvoie toutes les constellations
	{
		$sql = "SELECT constellation.*, constellation_name.name FROM constellation, constellation_name where constellation.identifiant = constellation_name.identifiant";
	}
	$exe = $pdo->query($sql);
	while($result = $exe->fetch(PDO::FETCH_OBJ))	//Construction du Json
	{
		array_push($data_array, array(
			"id"=> $result->id,
			"identifiant" => $result->identifiant,
			"liaison_number" => $result->liaison_number,
			"liaison" => $result->liaison,
			"name" => $result->name,
		));
	}
	exit(json_encode($data_array));
}

else if (isset($_POST["planet"])) //RECUPERATION DES PLANETE
{
	if (isset($_POST["name"]))	//Par nom
	{
		$sql = "SELECT * FROM planete where name = '" . $_POST["name"] . "'";
	}
	else	//Toutes les planetes
	{
		$sql = "SELECT * FROM planete";
	}
	$exe = $pdo->query($sql);
	while($result = $exe->fetch(PDO::FETCH_OBJ))	//Construction du json
	{
		array_push($data_array, array(
			"id"=> $result->id,
			"name" => $result->name,
			"planet_name" => $result->planete_name,
			"atmosphere" => $result->atmosphere,
			"speed" => $result->speed,
			"period" => $result->periode,
			"diameter" => $result->diametre,
			"mass" => $result->poids,
			"description" => $result->description,
		));
	}
	exit(json_encode($data_array));
}

?>
