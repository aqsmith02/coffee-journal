import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, InputNumber, Select, DatePicker } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export default function CreateCoffeeEntry({ API_URL, onEntryCreated }) {
    const [coffeeName, setCoffeeName] = useState('');
    const [roaster, setRoaster] = useState('');
    const [origin, setOrigin] = useState('');
    const [processing, setProcessing] = useState('');
    const [roastLevel, setRoastLevel] = useState('');
    const [brewingMethod, setBrewingMethod] = useState('');
    const [rating, setRating] = useState(null);
    const [tastingNotes, setTastingNotes] = useState('');
    const [dateTried, setDateTried] = useState(null);
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!coffeeName.trim()) {
            alert('Coffee name is required');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                coffee_name: coffeeName,
                roaster: roaster || null,
                origin: origin || null,
                processing: processing || null,
                roast_level: roastLevel || null,
                brewing_method: brewingMethod || null,
                rating: rating || null,
                tasting_notes: tastingNotes || null,
                date_tried: dateTried ? dateTried.format('YYYY-MM-DD') : null,
            };

            const response = await fetch(`${API_URL}/coffee-entries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok || response.status === 201) {
                onEntryCreated && onEntryCreated();
                setCoffeeName('');
                setRoaster('');
                setOrigin('');
                setProcessing('');
                setRoastLevel('');
                setBrewingMethod('');
                setRating(null);
                setTastingNotes('');
                setDateTried(null);
            } else {
                const txt = await response.text();
                alert('Save failed: ' + (txt || response.status));
            }
        } catch (err) {
            console.error(err);
            alert('Network error saving entry');
        } finally {
            setSaving(false);
        }
    }

    return (
        <Card title="Log Coffee" style={{ marginBottom: 16 }}>
            <Form layout="vertical" onSubmit={handleSubmit}>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Coffee Name" required>
                            <Input
                                value={coffeeName}
                                onChange={(e) => setCoffeeName(e.target.value)}
                                placeholder="e.g., Ethiopian Keramo"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Roaster">
                            <Input
                                value={roaster}
                                onChange={(e) => setRoaster(e.target.value)}
                                placeholder="e.g., Rowan"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Origin">
                            <Input
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                placeholder="e.g., Ethiopia"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Processing">
                            <Select
                                value={processing}
                                onChange={setProcessing}
                                placeholder="Select processing method"
                                allowClear
                            >
                                <Option value="Washed">Washed</Option>
                                <Option value="Natural">Natural</Option>
                                <Option value="Honey">Honey</Option>
                                <Option value="Cofermented">Cofermented</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Roast Level">
                            <Select
                                value={roastLevel}
                                onChange={setRoastLevel}
                                placeholder="Select roast level"
                                allowClear
                            >
                                <Option value="Light">Light</Option>
                                <Option value="Medium">Medium</Option>
                                <Option value="Dark">Dark</Option>
                                <Option value="Espresso">Espresso</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Brewing Method">
                            <Select
                                value={brewingMethod}
                                onChange={setBrewingMethod}
                                placeholder="Select brewing method"
                                allowClear
                            >
                                <Option value="Espresso">Espresso</Option>
                                <Option value="Pour Over">Pour Over</Option>
                                <Option value="French Press">French Press</Option>
                                <Option value="AeroPress">AeroPress</Option>
                                <Option value="Chemex">Chemex</Option>
                                <Option value="Cold Brew">Cold Brew</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Date Tried">
                            <DatePicker
                                value={dateTried}
                                onChange={setDateTried}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Rating (1-10)">
                            <InputNumber
                                value={rating}
                                onChange={setRating}
                                min={1}
                                max={10}
                                step={0.5}
                                placeholder="e.g., 8.5"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Tasting Notes">
                    <TextArea
                        value={tastingNotes}
                        onChange={(e) => setTastingNotes(e.target.value)}
                        placeholder="Describe the flavors, aroma, body, etc."
                        rows={3}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={saving}
                        block
                    >
                        Log Coffee
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
