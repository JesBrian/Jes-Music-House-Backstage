<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\Search;

class SearchService extends Service
{
    public static function searchInfoAndCreateRecord($key, $type)
    {
        Search::achieveSearchInfo($key, $type);
        Search::createOneSearchRecord($key, $type);
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        return self::ajaxStandardizationReturn();
    }
}
