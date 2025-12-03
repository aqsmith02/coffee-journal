import React, { useState, useEffect } from 'react';
import { Card, List, Button, Tag, Spin, Space, Empty, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function CoffeeEntries({ API_URL, refreshTrigger }) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchEntries() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/coffee-entries`);
            const data = await response.json();
            setEntries(data.reverse()); // newest first
        } catch (err) {
            console.error('Fetch entries error', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEntries();
    }, [refreshTrigger]);

    async function deleteEntry(entryId) {
        if (!confirm('Delete this coffee entry?')) return;
        const prev = entries;
        setEntries(prev.filter(e => e.id !== entryId));
        try {
            const res = await fetch(`${API_URL}/coffee-entries/${entryId}`, {
                method: 'DELETE',
            });
            if (!res.ok && res.status !== 204) {
                throw new Error('Delete failed');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete; reloading list');
            setEntries(prev);
        }
    }

    return (
        <Card title="Coffee Journal">
            {loading ? (
                <Spin />
            ) : entries.length === 0 ? (
                <Empty description="No coffee entries yet" />
            ) : (
                <List
                    dataSource={entries}
                    renderItem={(entry) => (
                        <List.Item
                            actions={[
                                <Button
                                    key="delete"
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => deleteEntry(entry.id)}
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <div>
                                        <strong>{entry.coffee_name}</strong>
                                        {entry.rating && (
                                            <span style={{ marginLeft: 12, color: '#111111ff', fontWeight: 'bold' }}>
                                                {entry.rating}/10
                                            </span>
                                        )}
                                    </div>
                                }
                                description={
                                    <div style={{ marginTop: 8 }}>
                                        <Row gutter={[12, 8]}>
                                            {entry.roaster && (
                                                <Col>
                                                    <Tag color="gray">Roaster: {entry.roaster}</Tag>
                                                </Col>
                                            )}
                                            {entry.origin && (
                                                <Col>
                                                    <Tag color="gray">Origin: {entry.origin}</Tag>
                                                </Col>
                                            )}
                                            {entry.processing && (
                                                <Col>
                                                    <Tag color="gray">Process: {entry.processing}</Tag>
                                                </Col>
                                            )}
                                            {entry.roast_level && (
                                                <Col>
                                                    <Tag color="gray">Roast: {entry.roast_level}</Tag>
                                                </Col>
                                            )}
                                            {entry.brewing_method && (
                                                <Col>
                                                    <Tag color="gray">Method: {entry.brewing_method}</Tag>
                                                </Col>
                                            )}
                                        </Row>
                                        {entry.tasting_notes && (
                                            <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
                                                <strong>Notes:</strong> {entry.tasting_notes}
                                            </div>
                                        )}
                                        {entry.date_tried && (
                                            <div style={{ marginTop: 4, fontSize: 12, color: '#999' }}>
                                                Tried: {new Date(entry.date_tried).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
}
