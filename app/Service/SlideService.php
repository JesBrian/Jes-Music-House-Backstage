<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\Slide;

class SlideService extends Service
{
    /**
     * Notes:
     * @return array
     */
    public static function getFrontendSlideService()
    {
        $slideData = Slide::getFrontendSlide();
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = $slideData;
        return parent::ajaxStandardizationReturn();
    }

    /**
     * Notes:
     * @param $data
     * @return array
     */
    public static function getSlideListByPaginationService($data)
    {
        $slideData = Slide::getPaginationSlideData();
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = $slideData;
        return parent::ajaxStandardizationReturn();
    }
}
