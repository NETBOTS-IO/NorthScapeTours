"use client";

import React, { useState, useCallback } from "react";
import {
    Box,
    Button,
    Container,
    Rating,
    TextField,
    Typography,
    Chip,
    Stack,
    Switch,
    FormControlLabel,
    CircularProgress,
    Alert,
    Grid,
} from "@mui/material";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface TestimonialsFormState {
    name: string;
    location: string;
    description: string;
    tags: string[];
    rating: number;
    occupation: string;
    tripName: string;
    tripDate: string;
    verified: boolean;
    featured: boolean;
    image: File | null;
}

const initialState: TestimonialsFormState = {
    name: "",
    location: "",
    description: "",
    tags: [],
    rating: 0,
    occupation: "",
    tripName: "",
    tripDate: "",
    image: null,
    verified: false,
    featured: false,
};

export default function CustomerReviewForm() {
    const [formData, setFormData] = useState<TestimonialsFormState>(initialState);
    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    /** Handle text or textarea changes */
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    /** Handle file input */
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, image: file }));
    }, []);

    /** Add a tag */
    const handleAddTag = useCallback(() => {
        if (tagInput && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput("");
        }
    }, [tagInput, formData.tags]);

    /** Delete a tag */
    const handleDeleteTag = useCallback((tag: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    }, []);

    /** Submit form */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponseMsg(null);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "tags" && Array.isArray(value)) {
                    value.forEach((tag) => formDataToSend.append("tags[]", tag));
                } else if (key === "image" && value instanceof File) {
                    formDataToSend.append("image", value);
                } else {
                    formDataToSend.append(key, String(value));
                }
            });

            const res = await fetch(`${BASE_URL}/api/testimonials/`, {
                method: "POST",
                body: formDataToSend,
            });

            if (!res.ok) throw new Error("Failed to submit review.");

            setResponseMsg({
                type: "success",
                text: "🎉 Thank you! Your review has been submitted successfully.",
            });
            setFormData(initialState);
        } catch (error: any) {
            setResponseMsg({
                type: "error",
                text: error.message || "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                aria-label="Customer Review Form"
                sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: "#fff",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    textAlign="center"
                    color="#f97316"
                    gutterBottom
                >
                    Share Your Experience
                </Typography>
                <Typography
                    variant="body1"
                    textAlign="center"
                    color="text.secondary"
                    mb={4}
                >
                    We value your feedback! Please fill out the form below to share your
                    experience.
                </Typography>

                <Grid container spacing={3}>
                    {/* Personal Info */}
                    {[
                        { label: "Full Name", name: "name", required: true },
                        { label: "Location", name: "location", required: true },
                        { label: "Occupation", name: "occupation" },
                        { label: "Trip Name", name: "tripName" },
                    ].map((field) => (
                        <Grid key={field.name} size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label={field.label}
                                name={field.name}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                fullWidth
                                required={field.required}
                                inputProps={{ "aria-label": field.label }}
                            />
                        </Grid>
                    ))}

                    {/* Trip Date */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Trip Date"
                            name="tripDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.tripDate}
                            onChange={handleChange}
                            fullWidth
                            inputProps={{ "aria-label": "Trip Date" }}
                        />
                    </Grid>

                    {/* File Upload */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Upload Image"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                            slotProps={{
                                inputLabel: { shrink: true },
                                htmlInput: { accept: "image/*" },
                            }}
                            fullWidth
                            inputProps={{ "aria-label": "Upload Image" }}
                        />
                    </Grid>

                    {/* Rating */}
                    <Grid size={{ xs: 12 }}>
                        <Typography component="legend" id="rating-label">
                            Your Rating*
                        </Typography>
                        <Rating
                            aria-labelledby="rating-label"
                            value={formData.rating}
                            onChange={(_, newValue) =>
                                setFormData((prev) => ({ ...prev, rating: newValue ?? 0 }))
                            }
                            size="large"
                        />
                    </Grid>

                    {/* Review */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Your Review"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                            required
                            inputProps={{ "aria-label": "Your Review" }}
                        />
                    </Grid>

                    {/* Tags */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                            Tags (optional)
                        </Typography>
                        <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                            {formData.tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={() => handleDeleteTag(tag)}
                                    aria-label={`Remove tag ${tag}`}
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Add Tag"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                size="small"
                                inputProps={{ "aria-label": "Add Tag" }}
                            />
                            <Button
                                variant="outlined"
                                onClick={handleAddTag}
                                sx={{
                                    borderColor: "#f97316",
                                    color: "#f97316",
                                    ":hover": { borderColor: "#fb923c", color: "#fb923c" },
                                }}
                            >
                                Add
                            </Button>
                        </Stack>
                    </Grid>

                    {/* Switches */}
                    <Grid size={{ xs: 12 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.verified}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            verified: e.target.checked,
                                        }))
                                    }
                                    inputProps={{ "aria-label": "Verified Customer" }}
                                />
                            }
                            label="Verified Customer"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.featured}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            featured: e.target.checked,
                                        }))
                                    }
                                    inputProps={{ "aria-label": "Featured Review" }}
                                />
                            }
                            label="Featured Review"
                        />
                    </Grid>

                    {/* Submit Button */}
                    <Grid size={{ xs: 12 }}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                disabled={loading}
                                aria-label="Submit Review"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    backgroundColor: "#f97316",
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    transition: "background-color 0.3s ease",
                                    ":hover": { backgroundColor: "#fb923c" },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Submit Review"
                                )}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {responseMsg && (
                    <Box mt={4}>
                        <Alert severity={responseMsg.type}>{responseMsg.text}</Alert>
                    </Box>
                )}
            </Box>
        </Container >
    );
}
