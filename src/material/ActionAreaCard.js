import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";

export default function ActionAreaCard({
  Title,
  Subtitle,
  ImageUrl,
  ImageAltText,
  Url,
}) {
  return (
    <Link href={Url} target="_blank">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={ImageUrl}
            alt={ImageAltText}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {Title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {Subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
