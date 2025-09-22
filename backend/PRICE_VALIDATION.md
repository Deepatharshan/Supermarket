# Price Validation Documentation

## Overview
The supermarket application now includes comprehensive price validation to ensure data integrity and prevent invalid price entries.

## Validation Rules

### Backend Validation (Laravel)
The `ValidPrice` custom validation rule enforces the following requirements:

1. **Must be numeric**: The price must be a valid number
2. **Must be greater than 0**: Price cannot be zero or negative
3. **Maximum 2 decimal places**: Prices like 10.999 are rejected
4. **Maximum value limit**: Prices cannot exceed 999,999.99
5. **Required field**: Price is mandatory for all products

### Frontend Validation (React)
Client-side validation provides immediate feedback:

1. **Real-time validation**: Checks input as user types
2. **Clear error messages**: Specific feedback for each validation rule
3. **Input constraints**: HTML5 input attributes (min, max, step)
4. **Helper text**: Guidance for users on expected format

## Examples

### ✅ Valid Prices
- `10` (whole number)
- `10.5` (one decimal place)
- `10.50` (two decimal places)
- `999999.99` (maximum allowed)

### ❌ Invalid Prices
- `0` (must be greater than 0)
- `-5` (cannot be negative)
- `10.999` (more than 2 decimal places)
- `1000000` (exceeds maximum limit)
- `"abc"` (not numeric)

## Implementation Details

### Backend (Laravel)
```php
// Custom validation rule
'price' => ['required', new ValidPrice]

// Database constraint
$table->decimal('price', 10, 2)->default(0);
```

### Frontend (React)
```javascript
// Validation logic
if (Number(form.price) <= 0) {
  setError('Price must be greater than 0');
  return;
}

if (!/^\d+(\.\d{1,2})?$/.test(priceStr)) {
  setError('Price must be a valid number with up to 2 decimal places');
  return;
}
```

## Error Messages

### Backend Error Messages
- "The price must be a valid number."
- "The price must be greater than 0."
- "The price must have at most 2 decimal places."
- "The price must be less than 1,000,000.00."

### Frontend Error Messages
- "Price must be greater than 0"
- "Price must be a valid number with up to 2 decimal places (e.g., 10.50)"
- "Price must be less than 1,000,000.00"

## Testing

Run the validation tests:
```bash
php artisan test tests/Feature/ProductPriceValidationTest.php
```

The test suite covers:
- Zero and negative price rejection
- Non-numeric value rejection
- Decimal place validation
- Maximum value validation
- Valid price acceptance

## Database Schema

The `products` table uses a `decimal(10,2)` column for price storage:
- **Precision**: 10 total digits
- **Scale**: 2 decimal places
- **Range**: 0.01 to 999,999.99

This ensures consistent storage and prevents precision loss during calculations.
