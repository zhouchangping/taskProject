<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Books */

$this->title = 'Update Books: ' . $model->bookid;
$this->params['breadcrumbs'][] = ['label' => 'Books', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->bookid, 'url' => ['view', 'id' => $model->bookid]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="books-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
