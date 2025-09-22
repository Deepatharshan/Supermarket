<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductPriceValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_price_must_be_greater_than_zero()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 0,
            'quantity' => 10
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['price']);
    }

    public function test_price_must_be_numeric()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 'invalid',
            'quantity' => 10
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['price']);
    }

    public function test_price_cannot_have_more_than_two_decimal_places()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 10.999,
            'quantity' => 10
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['price']);
    }

    public function test_price_cannot_exceed_maximum_limit()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 1000000.00,
            'quantity' => 10
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['price']);
    }

    public function test_valid_price_accepts_correct_format()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 10.50,
            'quantity' => 10
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'price' => 10.50,
            'quantity' => 10
        ]);
    }

    public function test_valid_price_without_decimal_places()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 10,
            'quantity' => 10
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'price' => 10,
            'quantity' => 10
        ]);
    }

    public function test_valid_price_with_one_decimal_place()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 10.5,
            'quantity' => 10
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'price' => 10.5,
            'quantity' => 10
        ]);
    }
}
