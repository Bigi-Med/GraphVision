<?php

declare(strict_types=1);

namespace Laminas\Paginator\Adapter;

use ReturnTypeWillChange;

use function array_slice;
use function count;

class ArrayAdapter implements AdapterInterface
{
    /**
     * Item count
     *
     * @var int
     */
    protected $count;

    /**
     * @param array $array ArrayAdapter to paginate
     */
    public function __construct(protected array $array = [])
    {
        $this->count = count($array);
    }

    /**
     * Returns an array of items for a page.
     *
     * @param  int $offset Page offset
     * @param  int $itemCountPerPage Number of items per page
     * @return array
     */
    public function getItems($offset, $itemCountPerPage)
    {
        return array_slice($this->array, $offset, $itemCountPerPage);
    }

    /**
     * Returns the total number of rows in the array.
     *
     * @return int
     */
    #[ReturnTypeWillChange]
    public function count()
    {
        return $this->count;
    }
}
