`
class DomainObject
{
    private $voltage;
    private $current;
    private $resistance;

    public function __construct($voltageIn = null, $currentIn = null, $resistanceIn = null)
    {
        $this->voltage = $voltage;
        $this->current = $current;
        $this->resistance = $resistance;
    }

    public function calculateX()
    {

    }

    public function setVoltage($voltage)
    {
        $this->voltage = $voltage;
    }
}
`;