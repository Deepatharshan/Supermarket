<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidPrice implements ValidationRule
{
    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the value is numeric
        if (!is_numeric($value)) {
            $fail('The :attribute must be a valid number.');
            return;
        }

        // Convert to float for comparison
        $price = (float) $value;

        // Check if price is greater than 0
        if ($price <= 0) {
            $fail('The :attribute must be greater than 0.');
            return;
        }

        // Check if price has more than 2 decimal places
        $decimalPlaces = strlen(substr(strrchr($value, "."), 1));
        if ($decimalPlaces > 2) {
            $fail('The :attribute must have at most 2 decimal places.');
            return;
        }

        // Check if price is within reasonable bounds (max 999999.99)
        if ($price > 999999.99) {
            $fail('The :attribute must be less than 1,000,000.00.');
            return;
        }
    }
}
