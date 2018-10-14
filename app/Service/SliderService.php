<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\Slider;

class SliderService extends Service
{
    /**
     * Notes:
     * @return array
     */
    public static function getFrontendSliderService()
    {
        $sliderData = Slider::getFrontendSlider();
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = $sliderData;
        return parent::ajaxStandardizationReturn();
    }

    /**
     * Notes:
     * @param $data
     * @return array
     */
    public static function getSliderListByPaginationService($data)
    {
        $sliderData = Slider::getPaginationSliderData();
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = $sliderData;
        return parent::ajaxStandardizationReturn();
    }
}
