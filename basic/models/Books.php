<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "books".
 *
 * @property int $bookid
 * @property string $bookname
 * @property string $booktime
 * @property string $booktitle
 */
class Books extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'books';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['bookname', 'booktime', 'booktitle'], 'required'],
            [['booktime'], 'safe'],
            [['bookname'], 'string', 'max' => 20],
            [['booktitle'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'bookid' => 'Bookid',
            'bookname' => 'Bookname',
            'booktime' => 'Booktime',
            'booktitle' => 'Booktitle',
        ];
    }
}
