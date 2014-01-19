<?php

namespace Bytedoc\Bundle\Gps\Helper;

use JMS\Serializer\Handler\SubscribingHandlerInterface;
use JMS\Serializer\GraphNavigator;
use JMS\Serializer\JsonSerializationVisitor;
use JMS\Serializer\Context;

class MyJsonHandler implements SubscribingHandlerInterface
{
    public static function getSubscribingMethods()
    {
        return array(
            array(
                'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
                'format' => 'json',
                'type' => 'DateTime',
                'method' => 'serializeDateTimeToJson',
            ),
        );
    }

    public function serializeDateTimeToJson(JsonSerializationVisitor $visitor, \DateTime $date, array $type, Context $context)
    {
        // return $date->format($type['params'][0]);
        return $date->format('Ymd');
    }
}